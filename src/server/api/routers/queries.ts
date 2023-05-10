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

            getEmployeesInSameDepartment: publicProcedure.input(
                z.object({
                    employeeId: z.number(),
                })).mutation(async ({ctx, input}) => {
                // Find employee X's department ID
                const employeeX = await ctx.prisma.employee.findUnique({
                    where: {id: input.employeeId},
                    select: {depId: true},
                });

                if (!employeeX) {
                    throw new TRPCError({
                        code: 'NOT_FOUND',
                        message: 'Employee not found',
                    });
                }

                const departmentId = employeeX.depId;

                // Find employees in the same department as employee X
                const employeesInSameDepartment = await ctx.prisma.employee.findMany({
                    where: {depId: departmentId},
                });

                return employeesInSameDepartment;
            }),
        // 7. Get names of locations where are located departments in which employee X is not working
        getLocationsWhereEmployeeXNotWorking: publicProcedure.input(
            z.object({
                employeeId: z.number(),
            })).mutation(async ({ctx, input}) => {
            // Find employee X's department ID
            const employeeX = await ctx.prisma.employee.findUnique({
                where: { id: input.employeeId },
                select: { depId: true },
            });

            if (!employeeX) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Employee not found',
                });
            }

            const employeeDepartmentId = employeeX.depId;

            // Find departments that are not employee X's department
            const otherDepartments = await ctx.prisma.department.findMany({
                where: { id: { not: employeeDepartmentId } },
                include: { Location: true },
            });

            // Extract the location names
            const otherLocations = otherDepartments.map(department => department.Location.locName);

            return otherLocations;
        }),

        // 6. Get the name of the Employee(s) working in Department X that has worked on every job available
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
