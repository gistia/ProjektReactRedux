import { FETCH_PROJECT } from '../actions/index';
import { FETCH_PROJECTS } from '../actions/index';
import { FETCH_MILESTONES } from '../actions/index';
import { FETCH_TASKS } from '../actions/index';
import { UPDATE_TASK } from '../actions/index';

const INITIAL_STATE = { all: [], project: null, milestones: [] };

// injects a collection of tasks on the milestone that
// matches the id we're using to fetch
function updateTasks(state, action) {
  const milestones = state.project.milestones.map((milestone) => {
    if (milestone.id == action.meta.id) {
      return { ...milestone, tasks: action.payload.data.tasks }
    }
    return milestone;
  });
  const project = { ...state.project, milestones };

  return { ...state, project };
}

// updates a single task on the proper milestone
function updateTask(state, action) {
  const { task } = action.payload.data;
  const milestones = state.project.milestones.map((milestone) => {
    if (milestone.id == task.milestone_id) {
      const tasks = milestone.tasks.map((milestoneTask) => {
        if (milestoneTask.id == task.id) {
          return task;
        }
        return milestoneTask;
      });

      return { ...milestone, tasks: tasks };
    }
    return milestone;
  });
  const project = { ...state.project, milestones };

  return { ...state, project };
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_PROJECT:
      return { ...state, project: action.payload.data.project };

    case FETCH_PROJECTS:
      return { ...state, all: action.payload.data.projects };

    case FETCH_MILESTONES:
      return { ...state, milestones: action.payload.data.milestones };

    case FETCH_TASKS:
      return updateTasks(state, action);

    case UPDATE_TASK:
      return updateTask(state, action);
  }

  return state;
}
