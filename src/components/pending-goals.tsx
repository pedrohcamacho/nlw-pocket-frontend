import { Plus } from 'lucide-react'
import { OutlineButton } from './ui/outline-button'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getPeddingGoals } from '../http/get-pedding-goals'
import { createGoalCompletion } from '../http/create-goal-completion'
export function PendingGoals () {
  const queryClient = useQueryClient();

  const {data} = useQuery({
    queryKey: ['pending-goals'], //sempre será um array
    queryFn: getPeddingGoals,
    staleTime: 1000 * 60 // 60 segundos
  })

  if (!data) {
    return null;
  }

  async function handleCompleteGoal(goalId: string) {
    await createGoalCompletion(goalId);
    queryClient.invalidateQueries({queryKey: ['summary']})
    queryClient.invalidateQueries({queryKey: ['pending-goals']})
  }

    return (
        <div className="flex flex-wrap gap-3">
        {data.map(goal => {
          return (
            <OutlineButton  onClick={()=>handleCompleteGoal(goal.id)} key={goal.id} disabled={goal.completionCount >= goal.desiredWeeklyFrequency}>
            <Plus className="size-4 text-zinc-600" />
            {goal.title}
          </OutlineButton>
          )
        })}
      </div>
    )
}