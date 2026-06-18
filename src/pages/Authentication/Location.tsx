import { Input } from "@/components/ui/input";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import LocationImage from "@/assets/location.svg";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
const Location = () => {
  return (
    <div className=" flex h-screen items-center justify-center bg-[#53B175]">
      <div className="relative flex flex-col p-6 gap-8 justify-between w-full lg:max-w-lg h-screen lg:max-h-[calc(100vh-64px)] lg:rounded-xl bg-white">
        <div className="flex flex-col gap-8 items-center">
          <div className="w-8 h-8 bg-[#030303] rounded-full flex items-center self-start justify-center text-white text-lg font-semibold">
            <FaChevronLeft />
          </div>
          <img
            src={LocationImage}
            alt="Location"
            className="w-56 object-cover"
          />
          <div className="flex flex-col gap-4 items-center w-3/4">
            <h5 className="text-2xl font-semibold text-[#030303]">
              Select Your Location
            </h5>
            <h6 className="text-base font-normal text-[#7C7C7C] text-center">
              Switch on your location to stay in tune with what’s happening in
              your area
            </h6>
          </div>
        </div>
        <div className="flex flex-col gap-10 w-full">
          <div className="flex flex-col gap-2 w-full">
            <h6 className="text-base font-semibold text-[#7C7C7C]">
              Your Zone
            </h6>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Types of your zone" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <h6 className="text-base font-semibold text-[#7C7C7C]">
              Your Area
            </h6>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Types of your area" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button className="h-16 bg-[#53B175] w-full text-white text-lg font-semibold rounded-2xl mb-12">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Location;
