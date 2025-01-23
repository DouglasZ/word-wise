import { FaSpinner } from "react-icons/fa";

interface LoadingProps {
    size?: number;
}

export const Loading = ({size}: LoadingProps) => {
    return (
        <div className="flex justify-center items-center m-4">
            <FaSpinner className="animate-spin text-2xl text-gray-600" size={size}/>
        </div>
    );
};
