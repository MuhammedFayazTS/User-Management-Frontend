import { Link } from "react-router-dom";

const Logo = (props: { url?: string; size?: string; fontSize?: string }) => {
  const { url = "/", size = "40px", fontSize = "24px" } = props;
  return (
    <div className="flex items-center justify-center sm:justify-start">
      <Link
        to={url}
        className={`rounded-sm  flex items-center border-2 dark:border-gray-200 justify-center  bg-gradient-to-br  from-primary  to-purple-500 to-90% `}
        style={{ width: size, height: size }}
      >
        <span
          className={`font-bold text-gray-50`}
          style={{ fontSize: fontSize }}
        >
            <img className="hover:scale-105 transition-transform ease-in-out duration-200" src="https://img.icons8.com/?size=100&id=UUr7TPbn4dvp&format=png&color=000000" alt="logo" />
        </span>
      </Link>
    </div>
  );
};

export default Logo;