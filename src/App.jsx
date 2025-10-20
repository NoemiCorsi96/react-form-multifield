import { useState } from 'react'
import titles from './data/titles'

/*Milestone 1
Creare una pagina che visualizzi una lista di articoli, mostrandone solo il titolo.
Milestone 2
Aggiungiamo in pagina un semplice form con un campo input in cui inserire il titolo di un 
nuovo articolo del blog. Al submit del form, mostrare la lista degli articoli aggiornati.
 
BONUS
 
Aggiungere la possibilità di cancellare ciascun articolo utilizzando un'icona.
Impostare il lavoro su più componenti. */

function App() {

  const [newTitle, setNewTitle] = useState('');
  const [copyTitle, setCopyTitle] = useState(titles);
  function handleSubmit(e) {
    e.preventDefault();
    console.log('Cliccare Submit');
    setCopyTitle([newTitle, ...copyTitle])
    setNewTitle('')

  }

  function handleTrash(i) {
    const filteredTitle = copyTitle.filter((_, index) => index != i)
    setCopyTitle(filteredTitle)
  }
  return (
    <>
      <div className='container'>
        <form className='mt-3 mb-5' onSubmit={handleSubmit}>
          <input className='form-control' type="text" placeholder='Inserisci un titolo di un articolo del blog' value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
        </form>

        <ul>
          {copyTitle.map((title, i) =>
            <li className='list-group-item d-flex justify-content-between mt-2 mb-2' key={i}>
              <span>
                {title}
              </span>

              <button className='btn btn-danger' onClick={() => handleTrash(i)}>
                <i className='bi bi-trash'></i>
              </button>
            </li>
          )}

        </ul>
      </div>
    </>
  )
}

export default App

