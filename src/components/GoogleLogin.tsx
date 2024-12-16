import { Button } from './ui/button'
import GoogleIcon from './googleIcon'

const googleLogin = () => {
    const baseURL = import.meta.env.VITE_API_BASE_URL;

    const googleLogin = () => {
        window.location.href = `${baseURL}/auth/google`;
    };
    return (
        <Button onClick={googleLogin} variant="outline" type="button" className="w-full h-[40px]">
            <GoogleIcon size="18px" />
            Google
        </Button>
    )
}

export default googleLogin