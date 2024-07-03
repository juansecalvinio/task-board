import { useState } from 'react'
import { AddIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import {
  Box,
  Heading,
  IconButton,
  useColorMode,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useColorModeValue,
  Link
} from '@chakra-ui/react'
import { Column } from '../components/Column'
import { useStore } from '../context/store'
import { v4 as uuidv4 } from 'uuid'
import { FaGithub } from 'react-icons/fa6'

type Status = 'PLANNED' | 'ONGOING' | 'DONE'

export const Home = () => {
  const { toggleColorMode } = useColorMode()
  const {
    isModalDeleteTaskOpen,
    isModalNewTaskOpen,
    taskToDelete,
    addTask,
    deleteTask,
    setIsModalDeleteTaskOpen,
    setIsModalNewTaskOpen
  } = useStore()

  const [text, setText] = useState<string>('')
  const [status, setStatus] = useState<Status>('PLANNED')

  const handleConfirmDelete = () => {
    deleteTask(taskToDelete)
    setIsModalDeleteTaskOpen(false)
  }

  return (
    <Box>
      <Box
        as='header'
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Box
          display='flex'
          alignItems={'center'}
          justifyContent={'space-between'}
          gap='1rem'
        >
          <Heading size={'lg'}>Task Board</Heading>
          <IconButton
            aria-label='add'
            onClick={() => setIsModalNewTaskOpen(true)}
            icon={<AddIcon />}
            colorScheme='yellow'
            size='sm'
          />
        </Box>
        <Box display='flex' alignItems={'center'} gap='0.5rem'>
          <Link
            href='https://github.com/juansecalvinio/task-board'
            target='_blank'
          >
            <IconButton
              variant={'outline'}
              aria-label='github'
              icon={<FaGithub />}
              size='md'
            />
          </Link>
          <IconButton
            onClick={toggleColorMode}
            aria-label={useColorModeValue('Modo oscuro', 'Modo claro')}
            icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
            size='md'
          />
        </Box>
      </Box>
      <Box
        as='main'
        display={'flex'}
        flexDirection={{ base: 'column', md: 'row', lg: 'row' }}
        alignItems={'flex-start'}
        justifyContent={'space-between'}
        mt={'1rem'}
        gap='1rem'
      >
        <Column state='PLANNED' />
        <Column state='ONGOING' />
        <Column state='DONE' />
      </Box>

      <Modal
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
        size='xs'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader p={'0.5rem 0.5rem 0.5rem 1rem'}>New task</ModalHeader>
          <ModalCloseButton />

          <ModalBody p={'1rem'}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                type='text'
                value={text}
                onChange={e => setText(e.target.value)}
                size='sm'
              />
            </FormControl>

            <FormControl>
              <FormLabel>Status</FormLabel>
              <Select
                size={'sm'}
                defaultValue={'PLANNED'}
                value={status}
                onChange={e => setStatus(e.target.value as Status)}
              >
                <option value='PLANNED'>PLANNED</option>
                <option value='ONGOING'>ONGOING</option>
                <option value='DONE'>DONE</option>
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter p={'1rem'}>
            <Button
              colorScheme='gray'
              variant={'outline'}
              mr={'1rem'}
              onClick={() => setIsModalNewTaskOpen(false)}
              size='sm'
            >
              Close
            </Button>
            <Button
              colorScheme='yellow'
              size='sm'
              onClick={() => {
                addTask({ id: uuidv4(), title: text, state: status })
                setText('')
                setIsModalNewTaskOpen(false)
              }}
            >
              Add task
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isModalDeleteTaskOpen}
        onClose={() => setIsModalDeleteTaskOpen(false)}
        size='xs'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader p={'0.5rem 0.5rem 0.5rem 1rem'}>Delete task</ModalHeader>
          <ModalCloseButton />
          <ModalBody p={'1rem'}>
            <Text>Do you want to delete this task?</Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme='red'
              variant={'outline'}
              mr={3}
              size='sm'
              onClick={() => setIsModalDeleteTaskOpen(false)}
            >
              Cancel
            </Button>
            <Button colorScheme='red' onClick={handleConfirmDelete} size='sm'>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box as='footer' mt={'2rem'}>
        <Text textAlign={'right'}>
          by{' '}
          <Link href='https://juansecalvinio.com' target='_blank'>
            juansecalvinio.com
          </Link>
        </Text>
      </Box>
    </Box>
  )
}
