import GoogleIcon from '@/components/icons/google';
import Logo from '@/components/icons/logo';
import { Button } from '@nextui-org/button';

export default function Login() {
  return (
    <div className="flex items-center h-[70vh] justify-center p-4">
      <div className="flex h-full  w-full flex-col items-center justify-center">
        <div className="flex flex-col items-center pb-6">
          <Logo size="60px" />
          <p className="text-xl font-medium">Bienvenido</p>
          <p className="text-small text-default-500">
            Inicia sesión en tu cuenta.
          </p>
        </div>
        <div className="mt-2 flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 py-6 shadow-small">
          <form className="flex flex-col gap-3">
            <Button variant="bordered" startContent={<GoogleIcon />}>
              Continuar con Google
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
