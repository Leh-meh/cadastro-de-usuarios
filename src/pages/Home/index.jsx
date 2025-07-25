import { useEffect, useState, useRef } from 'react' 
import './style.css'
import api from '../../services/api'

function Home() {
  const [users, setUsers] = useState([]) // useState cria uma variável que, quando atualizada, atualiza a tela automaticamente


  const inputNmae = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  async function getUsers() {
    try {
      const usersFromApi = await api.get('/usuarios')
      setUsers(usersFromApi.data)
      console.log(usersFromApi.data) // Aqui você vê os dados certos
    } catch (error) {
      console.error("Erro ao buscar usuários:", error)
    }
  }

  async function createUsers() {
    await api.post('/usuarios', {
      name: inputNmae.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    })
    getUsers() // vai recarregar a tela automaticamente
  }

  async function deleteUsers(id) {
  await api.delete(`/usuarios/${id}`)

      getUsers() // vai recarregar a tela automaticamente
    }


  useEffect(() => {
    getUsers()
  }, [])

return (
  <div className='container'>
    <form>
      <h1>Cadastro de Usuários</h1>

      <div className="input-with-icon">
        <input placeholder='Nome' name='nome' type='text' ref={inputNmae} />
        <img
          className="icon"
          width="24"
          height="24"
          src="https://img.icons8.com/material-rounded/24/businessman--v2.png"
          alt="businessman"
        />
      </div>

        <div className="input-with-icon">
      <input placeholder='Idade' name='idade' type='number' ref={inputAge} />
      <img width="48"
       height="48"
        src="https://img.icons8.com/fluency-systems-filled/48/age.png"
         alt="age"/>
         </div>

  <div className="input-with-icon">
      <input placeholder='Email' name='email' type='email' ref={inputEmail} />
      <img width="48" 
      height="48" 
      src="https://img.icons8.com/fluency-systems-filled/48/new-post.png" 
      alt="new-post"/>
      </div>
      <button type='button' onClick={createUsers}>Cadastrar</button>
    </form>

    {users.map(user => (
      <div key={user.id} className="card">
        <div>
          <p>Nome: <span>{user.name}</span></p>
          <p>Idade: <span>{user.age}</span></p>
          <p>Email: <span>{user.email}</span></p>
        </div>
        <button onClick={() => deleteUsers(user.id)}>
          <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/filled-trash.png" alt="filled-trash" />
        </button>
      </div>
    ))}
  </div>
)
}

export default Home
