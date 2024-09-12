import { Dialog } from './components/ui/dialog'
import { Summary } from './components/summary'
import { EmptyGoals } from './components/empty-goals'
import { useQuery } from '@tanstack/react-query'
import { getSummary } from './http/get-summary'
import { CreateGoal } from './components/create-goal'

export function App() {
  const {data} = useQuery({
    queryKey: ['summary'], //sempre será um array
    queryFn: getSummary,
    staleTime: 1000 * 60
  })

  return (
    <Dialog>
      {
       data?.total && data.total > 0 ?  <Summary /> : <EmptyGoals/>
      }
        <CreateGoal />
    </Dialog>
  )
}
