import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

    for (let i = 1; i <= 5; i++) {
        await prisma.location.create({
            data: {
                locName: `Location${i}`,
                postIndex: `PostIndex${i}`,
            },
        })

        await prisma.department.create({
            data: {
                depName: `Department${i}`,
                dateOfFoundation: new Date(),
                locId: i,
            },
        })

        await prisma.employee.create({
            data: {
                fName: `FirstName${i}`,
                lName: `LastName${i}`,
                bDate: new Date(),
                sex: i % 2,
                empAddress: `Address${i}`,
                depId: i,
            },
        })

        await prisma.salaryHistory.create({
            data: {
                emplId: i,
                salary: Math.floor(Math.random() * 1000),
                startingDate: new Date(),
                endDate: new Date(),
            }
        })

        await prisma.job.create({
            data: {
                jobTitle: `Job${i}`,
                minSalary: Math.floor(Math.random() * 1000),
                maxSalary: Math.floor(Math.random() * 1000),
            },
        })

        await prisma.jobHistory.create({
            data: {
                jobId: i,
                emplId: i,
                startingDate: new Date(),
                endingDate: new Date(),
            },
        })
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
