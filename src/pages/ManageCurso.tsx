import { useState } from "react";
import { CreateCurso } from "../components/CreateCurso";
import { DisplayCursos } from "../components/DisplayCursos";
import Layout from "../Layout";

function ManageCurso() {
    const [reload, setReload] = useState();
    return (
        <Layout>
            {/* @ts-ignore */}
            <CreateCurso setReload={setReload} />
            {/* @ts-ignore */}
            <DisplayCursos reload={reload} />
        </Layout>
    );
}

export default ManageCurso;
