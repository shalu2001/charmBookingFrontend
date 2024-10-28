import './App.css'
import AuthProvider from 'react-auth-kit'
import store from './AuthStore'

function App() {

  return (
    <AuthProvider store={store}>
      <div className='text-5xl text-yellow-300'>
        hello world
      </div>
    </AuthProvider>
  )
}

export default App
