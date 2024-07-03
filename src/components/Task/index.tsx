import { useStore } from '../../context/store'
import {
  Card,
  CardHeader,
  IconButton,
  Text,
  useColorModeValue
} from '@chakra-ui/react'

import { FaTrash } from 'react-icons/fa'

interface Props {
  id: string
}

export const Task = ({ id }: Props) => {
  const task = useStore(store => store.tasks.find(task => task.id === id))

  const { setDraggedTask, setIsModalDeleteTaskOpen, setTaskToDelete } =
    useStore()

  const handleClickDelete = () => {
    if (!!task) setTaskToDelete(task.id)
    setIsModalDeleteTaskOpen(true)
  }

  return (
    <Card
      draggable
      onDragStart={() => setDraggedTask(id)}
      _hover={{ cursor: 'move' }}
      variant={useColorModeValue('elevated', 'outline')}
    >
      <CardHeader
        p={'0.5rem'}
        display={'flex'}
        alignItems={'flex-start'}
        justifyContent={'space-between'}
      >
        <Text fontSize={'md'}>{task?.title}</Text>
        <IconButton
          aria-label='delete'
          icon={<FaTrash />}
          size={'sm'}
          onClick={handleClickDelete}
        />
      </CardHeader>
    </Card>
  )
}
