'use client'

import { useFormStatus } from 'react-dom'
import { useFormState } from 'react-dom'

import {  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { Switch } from "@nextui-org/switch";
import { useState } from "react";
import { ImagePlus, X } from "lucide-react";

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { agregarProducto } from '../lib/actions';

const schema = z.object({
    nombre: z.string().min(1, { message: 'Debe agregar un nombre al producto' }),
    precio: z.string().min(1, { message: 'El producto debe tener un precio' }),
    descripcion: z.string(),
    disponible: z.boolean()
  });

const initialState = {
    email: '',
    password: '',
    message: '',
  } 

function SubmitButton() {
    const { pending } = useFormStatus()

    return <Button color="secondary" type="submit" isLoading={pending} >Agregar</Button>
}

  
export default function ModalCreateProduct({ categoria, negocio }) {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [file, setFile] = useState(undefined)
    const [errores, formAction] = useFormState(agregarProducto, initialState)

    const { register, handleSubmit, control, formState: { errors }, } = useForm({ 
        resolver: zodResolver(schema),
        defaultValues:{
            disponible: false,
        }
    });

    const handleImage = (e) => {
        setFile(e.target.files[0])
    }   

    const onSubmit = (dataForm) => {
        formAction({...dataForm, file,categoria, negocio})
    }
    
    return (<>
        <Button color='secondary' onPress={onOpen}>Agregar</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">Agregar producto</ModalHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalBody>

                        <Input 
                            {...register('nombre')} 
                            isInvalid={!!errors.nombre} 
                            placeholder="Nombre del producto"
                            errorMessage={errors.nombre?.message}
                        />

                        { !file  && 
                            <label htmlFor='document' className='w-full h-32 flex flex-col justify-center items-center p-4 cursor-pointer rounded-xl bg-[#f4f4f5]' >
                                <ImagePlus />
                                <p className='text-small font-thin' >Agregar foto</p>
                            </label>
                        }
                        { file  && 
                            <div className='w-full h-32 cursor-pointer rounded-xl relative' >
                                <img src={URL.createObjectURL(file)} className='object-cover w-full h-full rounded-xl' alt='previsualizacion de imagen' />
                                <button onClick={()=> setFile(undefined)} className='bg-[#f4f4f5] rounded-full p-2 text-slate-500 absolute top-4 right-4' >
                                    <X />
                                </button>
                            </div>
                        }
                        
                        <input id='document' value={file?.filename}  onChange={ handleImage } hidden type='file' />

                        <Input 
                            {...register('precio')} 
                            isInvalid={!!errors.precio} 
                            placeholder="Precio" 
                            type='number' 
                            errorMessage={errors.precio?.message}
                        />

                        <Textarea 
                            {...register('descripcion')} 
                            isInvalid={!!errors.descripcion} 
                            placeholder='Describe tu producto...' 
                            errorMessage={errors.descripcion?.message}
                        />

                        <Controller
                            control={control}
                            name="disponible"
                            render={({ field: { onChange, onBlur, value } }) => (
                            <Switch
                                color='secondary' 
                                className='inline-flex flex-row-reverse w-full max-w-full justify-between'
                                onChange={onChange} 
                                onBlur={onBlur}
                                selected={value}
                            >
                            Disponible
                            </Switch>
                            )}
                        />

                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                        Cerrar
                        </Button>
                        <SubmitButton />
                    </ModalFooter>
                </form>
                </>
            )}
            </ModalContent>
        </Modal>
    </>)
}