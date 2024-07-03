import { ChakraProvider, Container } from '@chakra-ui/react'
import theme from './theme'
import { Home } from './pages/Home'

function App () {
  return (
    <ChakraProvider theme={theme}>
      <Container maxW={'1024px'} h='100vh' p='1rem'>
        <Home />
      </Container>
    </ChakraProvider>
  )
}

export default App
