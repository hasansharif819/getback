import { User } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import pick from '../../utils/pick';
import sendResponse from '../../utils/sendResponse';
import { claimFilterAbleFields } from './claim.constant';
import claimServices from './claim.service';

const claimItem = catchAsync(async (req: Request, res: Response) => {
	const claimItem = await claimServices.claimItem(req.body, req.user as User);

	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: 'Item claimed successfully!',
		data: claimItem
	});
});

const getClaims = catchAsync(async (req: Request, res: Response) => {
	const query = pick(req.query, claimFilterAbleFields);
	const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
	const { meta, claims } = await claimServices.getClaims(query, options);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Claims are retrieved successfully',
		meta,
		data: claims
	});
});

const getClaim = catchAsync(async (req: Request, res: Response) => {
	const { claimId } = req.params;
	const claim = await claimServices.getClaim(claimId);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Your Claim is retrieved successfully',
		data: claim
	});
});

const getMyClaims = catchAsync(async (req: Request, res: Response) => {
	const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
	const query = pick(req.query, claimFilterAbleFields);
	const { meta, claims } = await claimServices.getMyClaims(req.user?.id as string, options, query);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'My Claims are retrieved successfully',
		meta,
		data: claims
	});
});

const updateClaim = catchAsync(async (req: Request, res: Response) => {
	const { claimId } = req.params;
	const updatedClaim = await claimServices.updateClaim(claimId, req.body, req.user as User);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'You have successfully updated the claim data',
		data: updatedClaim
	});
});

const updateStatus = catchAsync(async (req: Request, res: Response) => {
	const { claimId } = req.params;
	const updatedClaim = await claimServices.updateStatus(claimId, req.body, req.user as User);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Claim status updated successfully',
		data: updatedClaim
	});
});

const deleteClaim = catchAsync(async (req: Request, res: Response) => {
	const { claimId } = req.params;
	await claimServices.deleteClaim(claimId, req.user as User);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Claim deleted successfully'
	});
});

const ClaimControllers = {
	claimItem,
	getClaims,
	getClaim,
	updateClaim,
	deleteClaim,
	updateStatus,
	getMyClaims
};

export default ClaimControllers;
