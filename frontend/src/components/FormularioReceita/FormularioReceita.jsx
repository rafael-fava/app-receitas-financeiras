import "./FormularioReceita.css";

export default function FormularioReceita(){

    return(

        <section className="formulario">

            {!receita && (
            <p className="consulta-texto">
                Use o identificador de um lançamento para consultar seu registro
                individual.
            </p>
            )}

        </section>

    )

}