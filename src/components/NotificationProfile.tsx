import Image from "next/image";
import { FaRegBell } from "react-icons/fa";

const NotificationProfile = () => (
  <div className="lg:flex items-center justify-end gap-8 hidden ">
    <FaRegBell className="text-3xl dark:text-white text-black" />
    <Image
      alt=""
      src={"/homepage/profile.jpg"}
      height={30}
      width={39}
      className="object-cover rounded-full"
    />
  </div>
);

export default NotificationProfile;
