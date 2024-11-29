import { createContext } from "react";

interface EditDetailsContextType {
    editStatus: boolean;
    setEditStatus: (status: boolean) => void;
}

const EditDetailsContext = createContext<EditDetailsContextType>({
    editStatus: false,
    setEditStatus: () => {},
})

export default EditDetailsContext;