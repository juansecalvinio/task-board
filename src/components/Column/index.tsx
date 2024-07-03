import { useState } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Tag,
  useColorModeValue
} from '@chakra-ui/react'

import { useStore } from '../../context/store'

import { Task } from '../Task'

interface Props {
  state: string
}

export const Column = ({ state }: Props) => {
  const [drop, setDrop] = useState<boolean>(false)

  const tasks = useStore(store =>
    store.tasks.filter(task => task.state === state)
  )

  const { draggedTask, setDraggedTask, moveTask } = useStore()

  const getColorScheme = () => {
    if (state === 'PLANNED') return 'yellow'
    if (state === 'ONGOING') return 'blue'
    if (state === 'DONE') return 'green'
  }

  return (
    <Card
      onDragOver={e => {
        setDrop(true)
        e.preventDefault()
      }}
      onDragLeave={e => {
        setDrop(false)
        e.preventDefault()
      }}
      onDrop={() => {
        setDrop(false)
        setDraggedTask(null)
        moveTask(draggedTask ? draggedTask : '', state)
      }}
      borderWidth={'2px'}
      borderStyle={drop ? 'dotted' : 'solid'}
      borderColor={drop ? useColorModeValue('gray', 'gray') : 'inherit'}
      border={drop ? '2px dashed gray' : '2px solid inherit'}
      variant={'filled'}
      width={'100%'}
    >
      <CardHeader
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        p={'0.5rem'}
      >
        <Tag colorScheme={getColorScheme()}>{state}</Tag>
      </CardHeader>

      <CardBody
        display={'flex'}
        flexDirection={'column'}
        gap={'1rem'}
        p={'0.5rem'}
      >
        {tasks.map(task => (
          <Task id={task.id} key={task.id} />
        ))}
      </CardBody>
    </Card>
  )
}
