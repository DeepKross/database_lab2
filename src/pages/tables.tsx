import {type NextPage} from "next";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {api} from "~/utils/api";
import {useState} from "react";
import {Box, Divider, TextField, Card} from "@mui/material";
import {AppRouter} from "~/server/api/root";
import {inferRouterOutputs} from "@trpc/server";
import JSONViewer from "react-json-viewer";


type RouterOutput = inferRouterOutputs<AppRouter>;
export type QueryRes = {
    first: RouterOutput["queries"]["getEmployeeAndDepartment"];
    second: RouterOutput["queries"]["getJobAndJobHistory"];
    third: RouterOutput["queries"]["getEmployeesByDepartmentId"];
    fourth: RouterOutput["queries"]["getDepartmentAndLocation"];
    fifth: RouterOutput["queries"]["getEmployeeSalaryHistory"];
    sixth: RouterOutput["queries"]["getEmployeesWorkedSameJob"];
    seventh: RouterOutput["queries"]["getEmployeesWorkedExactSameJobs"];
    eighth: RouterOutput["queries"]["getEmployeeWorkedEveryJob"];
};

const QueryComponent = ({queryKey, queryName, queryId, queryFunc}) => {
    const [id, setId] = useState<number>(1);
    const [result, setResult] = useState<QueryRes[typeof queryKey]>(null);
    const [error, setError] = useState<string>(null);
    const {mutate} = api.queries[queryFunc].useMutation({
        onSuccess: (data) => {
            console.log(data);
            setResult(data);
        },
        onError: (error) => {
            console.log(error);
            setResult(null);
            setError(error.message);
        },
    });

    return (

        <Card
            sx={{
                borderRadius: '0.5rem',
                padding: '1rem',
                margin: '1rem',
                transition: '0.3s',
            }}
            elevation={3}
            onMouseOver={(e) => e.currentTarget.style.boxShadow = '0px 0px 20px 0px rgba(0,0,0,0.75)'}
            onMouseOut={(e) => e.currentTarget.style.boxShadow = ''}
        >
            <Typography sx={{
                fontSize: '1.2rem',
                fontWeight: 'bold',
                fontFamily: ['monospace', 'monospace']
            }}>{queryName}</Typography>
            <Typography sx={{
                fontSize: '1rem',
                fontFamily: ['monospace', 'monospace']
            }}>{queryId}: </Typography>
            <Box>
                <TextField
                    id={`${queryKey}-basic`}
                    label="Standard"
                    variant="standard"
                    type="number"
                    value={id}
                    onChange={(e) => setId(Number(e.target.value))}
                />
            </Box>
            <Button sx={{
                padding: '0.5rem',
                mt: '0.5rem'
            }} variant={"contained"} onClick={() => mutate({[queryId]: id})}>
                Get
            </Button>
            <Typography>
                Result: {result ? <JSONViewer json={result}></JSONViewer>
                : <Typography color="red" sx={{
                    fontSize: '1rem',
                    fontFamily: ['monospace', 'monospace']
                }}> "No result"</Typography>}

            </Typography>
            {error && <Typography>Error: {error}</Typography>}
        </Card>

    );
};

const SimpleQueries = () => {
    const queries = [
        {
            queryKey: "first",
            queryName: "1. Get an Employee and their Department Information (parameter: Employee ID)",
            queryId: "employeeId",
            queryFunc: "getEmployeeAndDepartment",
        },
        {
            queryKey: "second",
            queryName: "2. Get a Job and its associated Job History (parameter: Job ID)",
            queryId: "jobId",
            queryFunc: "getJobAndJobHistory",
        },
        {
            queryKey: "third",
            queryName: "3. Get all Employees in a specific Department (parameter: Department ID)",
            queryId: "departmentId",
            queryFunc: "getEmployeesByDepartmentId",
        },
        {
            queryKey: "fourth",
            queryName: "4. Get a Department and its Location (parameter: Department ID)",
            queryId: "departmentId",
            queryFunc: "getDepartmentAndLocation",
        },
        {
            queryKey: "fifth",
            queryName: "5. Get an Employee's Salary History (parameter: Employee ID)",
            queryId: "employeeId",
            queryFunc: "getEmployeeSalaryHistory",
        },
        {
            queryKey: "sixth",
            queryName: "Complex 1. Get information about Employees that worked the same jobs as Employee X",
            queryId: "employeeId",
            queryFunc: "getEmployeesWorkedSameJob",
        },
        {
            queryKey: "seventh",
            queryName: "Complex 2. Get employee`s information about employees that worked on those and only those jobs as Employee X",
            queryId: "employeeId",
            queryFunc: "getEmployeesWorkedExactSameJobs",
        },
        {
            queryKey: "eighth",
            queryName: "Complex 3. Get all Employees that works in Department X who have worked every Job availible",
            queryId: "departmentId",
            queryFunc: "getEmployeeWorkedEveryJob",
        }
    ];

    return (
        <Box>
            {queries.map((query) => (
                <Box key={query.queryKey}>
                    <QueryComponent {...query} />
                    <Divider/>
                </Box>
            ))}
        </Box>
    );
};

const Tables: NextPage = () => {
    return (
        <>
            <Typography variant="h4">View & edit tables</Typography>
            <Typography>
                <a href={"http://localhost:5555"} target={"_blank"}>
                    <Button
                        variant={"contained"}
                        sx={{width: "30vw", mt: "1rem", mb: "3rem"}}
                    >
                        Open Tables
                    </Button>
                </a>
            </Typography>
            <SimpleQueries/>
            <Divider/>
        </>
    );
};

export default Tables;
