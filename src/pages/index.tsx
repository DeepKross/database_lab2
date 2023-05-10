import {type NextPage} from "next";
import {Box, Button} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
const Home: NextPage = () => {

    return (
        <Box>
        <h1> DB Lab 2</h1>
            <Box sx={{
                width: '30vw',
                fontSize: '1.2rem',
            }}>
                Greetings to the DB Lab 2 project!
            </Box>

            <h2>How to use the app?</h2>
            <Box sx={
                {
                    width: '30vw',
                    fontSize: '1.2rem',
                }
            }>
                In this application you can easily manage the databases related to the project management system.
                To do so, simply go to the tables section and start working with the database.
                There you can view available records, select some and delete them,
                and add new records by pressing the add button. Last but not least, you can edit the records
                by placing a tick and double clicking the field you want to change.
                <br/>
                <br/>
                You can create, edit and delete LOCATIONS of some companies, COMPANIES (departments), EMPLOYEES,
                their JOB HISTORIES and SALARY HISTORIES, and availible JOBS.
                <br/>
                <br/>
                You also can perform both simple and complex queries to the database(see the Queries section).
            </Box>


            <Link href={"/tables"}>
                <Button variant={"contained"} sx={{
                    width: '30vw',
                    mt: '1rem',
                    mb: '3rem',
                }}>
                    Open Tables & Queries section
                </Button>
            </Link>



            <Box sx={
                {
                    width: '30vw',
                }
            }>
                <h2>Database schema</h2>
                <Image src="/diagram.png" alt="DB diagram" width={1214 / 2} height={1752 / 2} />
            </Box>
        </Box>
    )
};

export default Home;
