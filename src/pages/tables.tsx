import {type NextPage} from "next";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {api} from "~/utils/api";
import {useEffect, useState} from "react";
import {Box, Divider} from "@mui/material";
import {AppRouter} from "~/server/api/root";
import {inferRouterOutputs} from "@trpc/server";

// import {TasksView} from "~/components/DbTables";
// import {api} from "~/utils/api";
// import {CircularProgress} from "@mui/material";
type RouterOutput = inferRouterOutputs<AppRouter>;
export type firstQueryRes = RouterOutput["queries"]["getEmployeeAndDepartment"];
export type secondQueryRes = RouterOutput["queries"]["getJobAndJobHistory"];
export type thirdQueryRes = RouterOutput["queries"]["getEmployeesByDepartmentId"];
export type fourthQueryRes = RouterOutput["queries"]["getDepartmentAndLocation"];
export type fifthQueryRes = RouterOutput["queries"]["getEmployeeSalaryHistory"];
const FirstQuery = () => {
    const [employeeId, setEmployeeId] = useState<number>(1);
    const [result, setResult] = useState<firstQueryRes>(null);
    const [error, setError] = useState<string>(null);
    const { mutate } = api.queries.getEmployeeAndDepartment.useMutation({
        onSuccess: (data) => {
            console.log(data);
            setResult(data);
        },
        onError: (error) => {
            console.log(error);
            setResult(null);
            setError(error.message);
        }
    });

    return (
        <Box>
            <Typography> 1. Get an Employee and their Department Information (parameter: Employee ID)</Typography>
            <Typography>Employee ID: </Typography>
            <input type="number" value={employeeId} onChange={(e) => setEmployeeId(Number(e.target.value))}/>
            <Button variant={"contained"} onClick={() => mutate({employeeId})}>Get</Button>

            <Typography>Result: {result ? JSON.stringify(result) : "No result"}</Typography>
            {error && <Typography>Error: {error}</Typography>}
        </Box>
    )
}

const SecondQuery = () => {
    const [jobId, setJobId] = useState<number>(1);
    const [result, setResult] = useState<secondQueryRes>(null);
    const [error, setError] = useState<string>(null);
    const { mutate } = api.queries.getJobAndJobHistory.useMutation({
        onSuccess: (data) => {
            console.log(data);
            setResult(data);
        },
        onError: (error) => {
            console.log(error);
            setResult(null);
            setError(error.message);
        }
    });

    return (
        <Box>
            <Typography>2. Get a Job and its associated Job History (parameter: Job ID)</Typography>
            <Typography>Employee ID: </Typography>
            <input type="number" value={jobId} onChange={(e) => setJobId(Number(e.target.value))}/>
            <Button variant={"contained"} onClick={() => mutate({jobId})}>Get</Button>

            <Typography>Result: {result ? JSON.stringify(result) : "No result"}</Typography>
            {error && <Typography>Error: {error}</Typography>}
        </Box>
    )
}
const ThirdQuery = () => {
    // getEmployeesByDepartmentId: publicProcedure.input(
    const [departmentId, setDepartmentId] = useState<number>(1);
    const [result, setResult] = useState<thirdQueryRes>(null);
    const [error, setError] = useState<string>("");
    const { mutate } = api.queries.getEmployeesByDepartmentId.useMutation({
        onSuccess: (data) => {
            console.log(data);
            setResult(data);
        },
        onError: (error) => {
            console.log(error);
            setResult(null);
            setError(error.message);
        }
    });

    return (
        <Box>
            <Typography>    3.Get all Employees in a specific Department (parameter: Department ID)
            </Typography>
            <Typography>Department ID: </Typography>
            <input type="number" value={departmentId} onChange={(e) => setDepartmentId(Number(e.target.value))}/>

            <Button variant={"contained"} onClick={() => mutate({departmentId})}>Get</Button>

            <Typography>Result: {result ? JSON.stringify(result) : "No result"}</Typography>
            {error && <Typography>Error: {error}</Typography>}
        </Box>
    )
}

const FourthQuery = () => {
    // 4. Get a Department and its Location (parameter: Department ID)
    const [departmentId, setDepartmentId] = useState<number>(1);
    const [result, setResult] = useState<fourthQueryRes>(null);
    const [error, setError] = useState<string>("");
    const { mutate } = api.queries.getDepartmentAndLocation.useMutation({
        onSuccess: (data) => {
            console.log(data);
            setResult(data);
        },
        onError: (error) => {
            console.log(error);
            setResult(null);
            setError(error.message);
        }
    });

    return (
        <Box>
            <Typography>     4. Get a Department and its Location (parameter: Department ID)
            </Typography>
            <Typography>Department ID: </Typography>
            <input type="number" value={departmentId} onChange={(e) => setDepartmentId(Number(e.target.value))}/>

            <Button variant={"contained"} onClick={() => mutate({departmentId})}>Get</Button>

            <Typography>Result: {result ? JSON.stringify(result) : "No result"}</Typography>
            {error && <Typography>Error: {error}</Typography>}
        </Box>
    )
}

const FifthQuery = () => {
    // 5. Get an Employee's Salary History (parameter: Employee ID)
    const [employeeId, setEmployeeId] = useState<number>(1);
    const [result, setResult] = useState<fifthQueryRes>(null);
    const [error, setError] = useState<string>("");
    const { mutate } = api.queries.getEmployeeSalaryHistory.useMutation({
        onSuccess: (data) => {
            console.log(data);
            setResult(data);
        },
        onError: (error) => {
            console.log(error);
            setResult(null);
            setError(error.message);
        }
    });

    return (
        <Box>
            <Typography>      5. Get an Employee's Salary History (parameter: Employee ID)
            </Typography>
            <Typography>Employee ID: </Typography>
            <input type="number" value={employeeId} onChange={(e) => setEmployeeId(Number(e.target.value))}/>

            <Button variant={"contained"} onClick={() => mutate({employeeId})}>Get</Button>
            <Typography>Result: {result ? JSON.stringify(result) : "No result"}</Typography>
            {error && <Typography>Error: {error}</Typography>}
        </Box>
    )
}
const SimpleQueries = () => {
    return (
        <Box>
            <FirstQuery />

            <Divider  />
            <SecondQuery />

            <Divider  />
            <ThirdQuery />

            <Divider />
            <FourthQuery />

            <Divider />
            <FifthQuery />
        </Box>
    )
}
const Tables: NextPage = () => {
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
            <SimpleQueries />
        </>

    );
};

export default Tables;
