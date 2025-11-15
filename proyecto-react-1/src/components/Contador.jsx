import { useState } from "react"

function Contador() {

    const [contador, setContador] = useState(0)

    const handleClick= () => {
        setContador(contador + 1)
    }

    return (
        <div>
            <button onClick={handleClick}>Incrementar</button>
            <p id="parrafo">Contador: {contador}</p>
        </div>
    )
}

export default Contador