import { NextFunction, Request, Response } from "express";
import Blacklist from "../models/blacklist.model";
import { get, isEmpty, isObject } from 'lodash';
import { BadRequestError, NotFoundError } from "../../common/src";
import log from "../utils/logger";
import { CreateBlacklistInput, deleteBlacklistInput, getBlacklistInput, updateBlacklistInput } from "../schema/blacklist.schema";
import { Types } from "mongoose";


export const createBlacklistEntry = async (
   req: Request<unknown, unknown, CreateBlacklistInput["body"]>,
   res: Response,
   next: NextFunction
  ) => {
  try {

    if(isEmpty(req.body)){ 
      return next(new BadRequestError('Invalid Payload'));
    }

    const blacklist = new Blacklist(req.body);
    const response = await blacklist.save();

    return res.status(200).send({
      success : true,
      message : "blacklist rule added successfully",
      data : response
    });

  } catch (error) {
    log.error(`createBlacklistEntry : ${error}`);
    return next(new BadRequestError(`unable to process your request`));
  }
};


export const getBlacklistEntries = async (
   req: Request,
   res: Response,
   next: NextFunction
  ) => {
    try {
  
      const blacklist = await Blacklist.find();

      res.status(200).send({
        success : true,
        message : 'blacklist data fetched successfully',
        response : blacklist
      });
  
    } catch (error) {
      log.error(`getBlacklistEntries : ${error}`);
      return next(new BadRequestError(`unable to process your request`));
    }
};


export const getBlacklistEntryById = async (
  req: Request<getBlacklistInput["params"], unknown, unknown>,
  res: Response,
  next: NextFunction
) => {
  try {

    const filter = { blacklistCode : req.params.blacklistCode };
    const blacklistEntry = await Blacklist.findOne(filter);

    if (!blacklistEntry) {
      return next(new BadRequestError('Blacklist data not found'));
    }

    return res.status(200).send({
      success : true,
      message : 'Blacklist data fetched successfully',
      data : blacklistEntry
    });

  } catch (error) {
    log.error(`getBlacklistEntryById : error ${error}`);
    return next(new BadRequestError(`unable to process your request`));
  }
};


export const updateBlacklistEntry = async (
  req: Request<updateBlacklistInput["params"], unknown, updateBlacklistInput["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {

    const filter = { blacklistCode : req.params.blacklistCode};
    const count = await Blacklist.count(filter);

    if (!count) {
      return next(new BadRequestError('Blacklist data not found'));
    }

    const payload = req.body;
    const query = { "$push": payload };
    const blacklistEntry = await Blacklist.findOneAndUpdate(filter, query, { new: true });

    if (!blacklistEntry) {
      return next(new BadRequestError("Error in updating blacklist data"));
    }

    return res.status(200).send({
      success : true,
      message : "blacklist data updated successfully",
      data : blacklistEntry
    });

  } catch (error) {
    log.error(`updateBlacklistEntry : ${error}`);
    return next(new BadRequestError(`unable to process your request`));
  }
};


export const deleteBlacklistEntry = async(
  req: Request<deleteBlacklistInput["params"], any, any>,
  res: Response,
  next: NextFunction
) => {
  try {

    const filter = { blacklistCode : req.params.blacklistCode};
    const count = await Blacklist.count(filter);

    if (!count) {
      return next(new BadRequestError('Blacklist data not found'));
    } 
    
    const payload = req.body;
    const keys = Object.keys(payload);
    const values = Object.values(payload);
    const key = keys[0];
    let value = values[0];
    

    if(isObject(value)){
      const id = get(value,'_id');
      value = { _id : new Types.ObjectId(id) };
    }

    const query:any = {};
    query[`${key}`] = value;
    console.log('query ===>', query);
    const blacklistEntry = await Blacklist.findOneAndUpdate(filter, { $pull : query }, { new : true});
    if (!blacklistEntry) {
      return next(new BadRequestError("Blacklist entry not found"));
    }

    res.status(200).send({
      success : true,
      message: "Blacklist entry deleted successfully",
      data : blacklistEntry
    });

  }catch (error) {
    log.error(`deleteBlacklistEntry : ${error}`);
    return next(new BadRequestError(`unable to process your request`));
  }
};
