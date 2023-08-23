import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware, notificationHandlerMiddleware } from 'server/middlewares';
import { performanceAssessmentValidationSchema } from 'validationSchema/performance-assessments';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  const allowed = await prisma.performance_assessment
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  if (!allowed) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  switch (req.method) {
    case 'GET':
      return getPerformanceAssessmentById();
    case 'PUT':
      return updatePerformanceAssessmentById();
    case 'DELETE':
      return deletePerformanceAssessmentById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPerformanceAssessmentById() {
    const data = await prisma.performance_assessment.findFirst(
      convertQueryToPrismaUtil(req.query, 'performance_assessment'),
    );
    return res.status(200).json(data);
  }

  async function updatePerformanceAssessmentById() {
    await performanceAssessmentValidationSchema.validate(req.body);
    const data = await prisma.performance_assessment.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    await notificationHandlerMiddleware(req, data.id);
    return res.status(200).json(data);
  }
  async function deletePerformanceAssessmentById() {
    await notificationHandlerMiddleware(req, req.query.id as string);
    const data = await prisma.performance_assessment.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
