import {z} from "zod";

import {createTRPCRouter, publicProcedure} from "~/server/api/trpc";
import {TRPCError} from "@trpc/server";

export const queriesRouter = createTRPCRouter({
            // 1. Get an Employee and their Department Information (parameter: Employee ID)
            getEmployeeAndDepartment: publicProcedure.input(
                z.object({
                    employeeId: z.number(),
                })).mutation(async ({ctx, input}) => {
                return ctx.prisma.employee.findUnique({
                    where: {
                        id: input.employeeId,
                    },
                    include: {
                        Department: true,
                    },
                });
            }),

            // 2. Get a Job and its associated Job History (parameter: Job ID)
            getJobAndJobHistory: publicProcedure.input(
                z.object({
                    jobId: z.number(),
                })).mutation(async ({ctx, input}) => {
                return ctx.prisma.job.findUnique({
                    where: {
                        id: input.jobId,
                    },
                    include: {
                        JobHistory: true,
                    },
                });
            }),


            // 3.Get all Employees in a specific Department (parameter: Department ID)
            getEmployeesByDepartmentId: publicProcedure.input(
                z.object({
                    departmentId: z.number(),
                })).mutation(async ({ctx, input}) => {
                return ctx.prisma.employee.findMany({
                    where: {
                        depId: input.departmentId,
                    },
                    include: {
                        Department: true,
                    },
                });
            }),


            // 4. Get a Department and its Location (parameter: Department ID)

            getDepartmentAndLocation: publicProcedure.input(
                z.object({
                    departmentId: z.number(),
                })).mutation(async ({ctx, input}) => {
                return ctx.prisma.department.findUnique({
                    where: {
                        id: input.departmentId,
                    },
                    include: {
                        Location: true,
                    },
                });
            }),


            // 5. Get an Employee's Salary History (parameter: Employee ID)
            getEmployeeSalaryHistory: publicProcedure.input(
                z.object({
                    employeeId: z.number(),
                })).mutation(async ({ctx, input}) => {
                return ctx.prisma.employee.findUnique({
                    where: {
                        id: input.employeeId,
                    },
                    include: {
                        SalaryHistory: true,
                    },
                });
            }),

        // 6. Get information about Employees that worked the same jobs as Employee X
        getEmployeesWorkedSameJob: publicProcedure.input(
            z.object({
                employeeId: z.number(),
            })
        ).mutation(async ({ ctx, input }) => {
            // Get the jobs that Employee X has worked on
            const employeeXJobs = await ctx.prisma.jobHistory.findMany({
                where: {
                    emplId: input.employeeId,
                },
            });
            const employeeXJobIds = employeeXJobs.map((jh) => jh.jobId);

            // Get all employees
            const employees = await ctx.prisma.employee.findMany({
                include: {
                    JobHistory: true,
                },
            });

            // Filter out employees who have worked on all the jobs that Employee X has worked on
            const employeesWorkedJobsAsEmployeeX = employees.filter(emp => {
                return employeeXJobIds.every(jobId =>
                    emp.JobHistory.some(jh => jh.jobId === jobId)
                );
            });

            return employeesWorkedJobsAsEmployeeX;
        }),






        // 7. Get information about Employees that worked exactly the same jobs as Employee X
        getEmployeesWorkedExactSameJobs: publicProcedure.input(
            z.object({
                employeeId: z.number(),
            })
        ).mutation(async ({ ctx, input }) => {
            // Get the jobs that Employee X has worked on
            const employeeXJobs = await ctx.prisma.jobHistory.findMany({
                where: {
                    emplId: input.employeeId,
                },
            });
            const employeeXJobIds = employeeXJobs.map((jh) => jh.jobId);

            // Get all employees who have worked on the same jobs as Employee X
            const employees = await ctx.prisma.employee.findMany({
                include: {
                    JobHistory: true,
                },
            });

            // Filter out employees who worked on jobs other than Employee X or have worked on fewer jobs
            const employeesWithExactSameJobs = employees.filter(emp => {
                const empJobIds = emp.JobHistory.map(jh => jh.jobId);
                return (
                    empJobIds.length === employeeXJobIds.length &&
                    empJobIds.every(jobId => employeeXJobIds.includes(jobId))
                );
            });

            return employeesWithExactSameJobs;
        }),






        /*//Filter out employees who have an empty array of JobHistory
                employees = employees.filter(emp => emp.JobHistory.length > 0);*/


        // 8. Get the name of the Employee(s) working in Department X that has worked on every job available
        getEmployeeWorkedEveryJob: publicProcedure.input(
            z.object({
                departmentId: z.number(),
            })
        ).mutation(async ({ ctx, input }) => {
            const allJobsCount = await ctx.prisma.job.count();

            const employees = await ctx.prisma.employee.findMany({
                where: {
                    depId: input.departmentId,
                },
                include: {
                    JobHistory: true,
                },
            });

            const employeesWorkedEveryJob = employees.filter((employee) => {
                const employeeJobsCount = new Set(employee.JobHistory.map((jh) => jh.jobId)).size;
                return employeeJobsCount === allJobsCount;
            });

            return employeesWorkedEveryJob.map((employee) => ({
                id: employee.id,
                name: `${employee.fName} ${employee.lName}`,
            }));
        }),

    }
    );
