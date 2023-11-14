import { obtener, url_api } from "@/hooks/Conexion";
/*const lista = () => {
    return fetch('https://computacion.unl.edu.ec/pdml/noticias/servidorNoticias.php?action=refrescaNoticia')
        .then(res => res.json());
}*/

export async function ListaNoticias() {
    const noticias = await obtener('servidorNoticias.php?action=refrescaNoticia');
    console.log(noticias);
    return (
        <div className="row">
            {noticias.map((dato, i) => (
                <div className="col-4" key={i}>
                    <div className="card" style={{ width: "18rem" }}>
                        <img src={url_api() + dato.imagen} className="card-img-top" alt="..."></img>
                        <div className="card-body">
                            <h5 className="card-title">Noticia {i + 1}</h5>
                            <p className="card-text">{dato.texto}</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>

            ))}
        </div>
    )
}