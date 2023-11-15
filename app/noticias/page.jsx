import { obtener } from "@/hooks/Conexion";
import { url_api } from "@/hooks/Conexion";
import Link from "next/link";
export default async function Page() {
    const noticias = await obtener('servidorNoticias.php?action=refrescaNoticia');

    return (
        <div className="row">
            <h1>Administrar Noticias</h1>
            <div className="container-fluid">
                <div className="col-4">
                    <Link href="/noticias/nuevo" className="btn btn-success">NUEVO</Link>
                </div>
                <table className="table table-hoover">
                    <thead>
                        <tr>
                            <th>Nro</th>
                            <th>Noticia</th>
                            <th>Imagen</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {noticias.map((dato, i) => (
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{dato.texto}</td>
                                <td><img src={url_api() + dato.imagen} className="card-img-top" alt="..."></img></td>
                                <td></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}