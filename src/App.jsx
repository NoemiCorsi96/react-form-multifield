import { useState } from 'react'
import titles from './data/titles'
const initialFormData = {
  titolo: '',
  autore: '',
  contenuto: '',
  categoria: 'FrontEnd'
}
const initialTasks = []

/*Milestone 1
Creare una pagina che visualizzi una lista di articoli, mostrandone solo il titolo.
Milestone 2
Aggiungiamo in pagina un semplice form con un campo input in cui inserire il titolo di un 
nuovo articolo del blog. Al submit del form, mostrare la lista degli articoli aggiornati.
 Aggiungere la possibilità di cancellare ciascun articolo utilizzando un'icona.
Impostare il lavoro su più componenti.
Ampliare l'esercizio precedente aggiungendo, nel form, il campo autore, contenuto ed un campo 
per una categoria a scelta tra: FrontEnd, BackEnd e UI/UX (utilizzando una select)

Aggiornare la visualizzazione della lista degli articoli, 
mostrando le nuove informazioni inserite.
BONUS:
Aggiungere un campo checkbox “Pubblicato” (che indica se l’articolo debba essere visibile o meno). */

function App() {
  const [formData, setFormData] = useState(initialFormData);
  const [articles, setArticles] = useState(titles);




  function handleSubmit(e) {
    e.preventDefault()


    const newArticle = {
      id: Date.now(),
      ...formData
    }



    setArticles([newArticle, ...articles])
    setFormData(initialFormData)

  }

  function handleChange(e) {

    let value;
    if (e.target.type == 'checkbox') {
      value = e.target.checked
    } else {
      value = e.target.value
    }


    setFormData({ ...formData, [e.target.name]: value })


  }

  function handleTrash(i) {
    setArticles((currentArticles) => currentArticles.filter((_, index) => index != i))
  }


  return (
    <>
      <div className='container'>
        <form className='mt-3 mb-5' onSubmit={handleSubmit}>
          <input className='form-control mb-2'
            type="text"
            name='titolo'
            placeholder='Inserisci un titolo di un articolo del blog'
            value={formData.titolo}
            onChange={handleChange} />

          {/* AUTORE */}
          <input
            className='form-control mb-2'
            type="text"
            name="autore"
            placeholder='Autore'
            value={formData.autore}
            onChange={handleChange}

          />

          {/* CONTENUTO */}
          <textarea
            className='form-control mb-2'
            name="contenuto"
            placeholder='Contenuto'
            rows={4}
            value={formData.contenuto}
            onChange={handleChange}

          />

          {/* CATEGORIA */}
          <select className='form-select mb-2' name="categoria" value={formData.categoria} onChange={handleChange} >
            <option value="FrontEnd">FrontEnd</option>
            <option value="BackEnd">BackEnd</option>
            <option value="UI/UX">UI/UX</option>
          </select>

          <button className='btn btn-primary' type="submit">Aggiungi Articolo</button>
        </form>

        <ul className='list-group'>
          {articles.map((articolo, i) =>
            <li className='list-group-item d-flex justify-content-between mt-2 mb-2' key={i}>
              <div>
                <h5 className='mb-1'>{articolo.titolo}</h5>
                {articolo.autore && <small className='text-muted'>Autore: {articolo.autore}</small>}
                {articolo.contenuto && <p className='mb-1 mt-2'>{articolo.contenuto}</p>}
                <span className='badge bg-secondary'>{articolo.categoria}</span>

              </div>


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

