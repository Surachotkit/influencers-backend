import { Request, Response } from 'express';
import { InfluencerService } from '../services/influencer';

const influencerService = new InfluencerService();

export class InfluencerController {
  async create(req: Request, res: Response) {
    try {
      const influencer = await influencerService.create(req.body);
      res.status(201).json(influencer);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create influencer' });
    }
  }

  async getAll(_req: Request, res: Response) {
    try {
      const influencers = await influencerService.findAll();
      res.json(influencers);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch influencers' });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params['id']);
      const influencer = await influencerService.findById(id);
      if (!influencer) {
        return res.status(404).json({ error: 'Influencer not found' });
      }
      return res.json(influencer);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch influencer' });
    }
  }

  async getUserManagement(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params['userId']);
      const influencers = await influencerService.findUserManagement(userId);
      res.json(influencers);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user influencers' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params['id']);
      const influencer = await influencerService.update(id, req.body);
      res.json(influencer);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update influencer' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params['id']);
      await influencerService.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete influencer' });
    }
  }
}