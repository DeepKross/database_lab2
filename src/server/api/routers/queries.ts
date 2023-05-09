import {z} from "zod";

import {createTRPCRouter, publicProcedure} from "~/server/api/trpc";
import {TRPCError} from "@trpc/server";

export const queriesRouter = createTRPCRouter({
            // 1. Get an Employee and their Department Information (parameter: Employee ID)
            getEmployeeAndDepartment: publicProcedure.input(
                z.object({
                    employeeId: z.number(),
                })).mutation(async ({ctx, input}) => {
                return await ctx.prisma.employee.findUnique({
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
                return await ctx.prisma.job.findUnique({
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
                return await ctx.prisma.employee.findMany({
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
                return await ctx.prisma.department.findUnique({
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
                return await ctx.prisma.employee.findUnique({
                    where: {
                        id: input.employeeId,
                    },
                    include: {
                        SalaryHistory: true,
                    },
                });
            }),
        }
    )
;
