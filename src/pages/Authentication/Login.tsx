import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import OrangeCarrot from "@/assets/orange-carrot.svg";
const Login = () => {
  return (
    <div className=" flex h-screen items-center justify-center bg-[#53B175]">
      <div className="relative flex flex-col p-6 gap-10 justify-center w-full lg:max-w-lg h-screen lg:max-h-[calc(100vh-64px)] lg:rounded-xl bg-white">
        <div className="w-full h-12 flex items-center justify-center mb-12">
          <img
            src={OrangeCarrot}
            alt="Orange Carrot"
            className="w-10 h-full object-contain"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h5 className="text-2xl font-semibold text-[#030303]">Log In</h5>
          <h6 className="text-base font-normal text-[#7C7C7C]">
            Enter your emails and password
          </h6>
        </div>
        <div className="flex flex-col gap-8 w-full">
          <div className="flex flex-col gap-2 w-full">
            <h6 className="text-base font-semibold text-[#7C7C7C]">Email</h6>
            <Input placeholder="Enter your Email" type="email" />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <h6 className="text-base font-semibold text-[#7C7C7C]">Password</h6>
            <Input placeholder="Enter your Password" type="password" />
            <p className="text-sm font-medium text-[#181725] text-end">
              Forgot Password?
            </p>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <Button className="h-16 bg-[#53B175] w-full text-white text-lg font-semibold rounded-2xl ">
              Log In
            </Button>
            <p className="text-sm font-medium text-[#181725] text-center mb-12">
              Don't have an account?{" "}
              <a href="#" className="text-[#53B175] hover:underline">
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
