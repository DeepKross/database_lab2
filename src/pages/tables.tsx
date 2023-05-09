import {type NextPage} from "next";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// import {TasksView} from "~/components/DbTables";
// import {api} from "~/utils/api";
// import {CircularProgress} from "@mui/material";

const Tables: NextPage = () => {
    // const {data: usersData, isLoading: isUsersLoading, isError: isUsersError} = api.users.getAll.useQuery();
    // const {data: salaryData, isLoading: isSalaryLoading, isError: isSalaryError} = api.salary.getAll.useQuery();
    // const {data: projectData, isLoading: isProjectLoading, isError: isProjectError} = api.projects.getAll.useQuery();
    // const {
    //     data: iterationData,
    //     isLoading: isIterationLoading,
    //     isError: isIterationError
    // } = api.iteration.getAll.useQuery();
    // const {data: taskData, isLoading: isTaskLoading, isError: isTaskError} = api.task.getAll.useQuery();
    // const {
    //     data: projectMembersData,
    //     isLoading: isProjectMembersLoading,
    //     isError: isProjectMembersError
    // } = api.projectMember.getAll.useQuery();
    //
    //
    // if (isUsersLoading) return <CircularProgress/>;
    // if (isUsersError) return <div>Error fetching users</div>;
    //
    //
    // if (isSalaryLoading) return <CircularProgress/>;
    // if (isSalaryError) return <div>Error fetching salaries</div>;
    //
    // if (isProjectLoading) return <CircularProgress/>;
    // if (isProjectError) return <div>Error fetching projects</div>;
    //
    // if (isIterationLoading) return <CircularProgress/>;
    // if (isIterationError) return <div>Error fetching iterations</div>;
    //
    // if (isTaskLoading) return <CircularProgress/>;
    // if (isTaskError) return <div>Error fetching tasks</div>;
    //
    // if (isProjectMembersLoading) return <CircularProgress/>;
    // if (isProjectMembersError) return <div>Error fetching project members</div>;

    return (
        <>
            <h1>View & edit tables</h1>
            <Typography>
                <a href={"http://localhost:5555"} target={"_blank"}>
                    <Button variant={"contained"} sx={{
                        width: '30vw',
                        mt: '1rem',
                        mb: '3rem',
                    }}>
                        Open Tables & Queries section
                    </Button>
                </a>
            </Typography>
        </>
        /* <TasksView
             usersData={usersData}
             salaryData={salaryData}
             projectData={projectData}
             iterationData={iterationData}
             taskData={taskData}
             projectMembersData={projectMembersData}
         />*/
    );
};

export default Tables;
