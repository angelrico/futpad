import campoCompleto from './assets/fondos/full.svg'

function App() {
  return (
    <main className="grid min-h-dvh place-items-center gap-6 p-8">
      <h1 className="font-display text-5xl font-bold text-cesped-900">Futpad</h1>
      <p className="text-tenue">Si ves esto con estilos, Tailwind y el @theme funcionan.</p>
      <div className="flex gap-3">
        <button className="rounded-full bg-destacado-500 px-6 py-2 font-semibold text-tinta">
          Guardar
        </button>
        <button className="rounded-full border-2 border-cesped-700 px-6 py-2 font-semibold text-cesped-700">
          Abrir
        </button>
      </div>
      <img src={campoCompleto} alt="Campo completo" className="w-full max-w-3xl rounded-xl" />
    </main>
  )
}

export default App
