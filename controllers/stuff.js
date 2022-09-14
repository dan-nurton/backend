import Thing from '../models/Thing.js';
import fs from 'fs';

    
  const createThing = (req, res, next) => {
      const thingObject = JSON.parse(req.body.thing);
      delete thingObject._id;
      delete thingObject._userId;
      const thing = new Thing({
          ...thingObject,
          userId: req.auth.userId,
          imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      });
    
      thing.save()
      .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
      .catch(error => { res.status(400).json( { error })})
  };
      
  const getOneThing = (req, res, next) => {
        Thing.findOne({
          _id: req.params.id
        }).then(
          (thing) => {
            res.status(200).json(thing);
          }
        ).catch(
          (error) => {
            res.status(404).json({
              error: error
            });
          }
        );
      };
      
    const modifyThing = (req, res, next) => {
      const thingObject = req.file ? {
          ...JSON.parse(req.body.thing),
          imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };
    
      delete thingObject._userId;
      Thing.findOne({_id: req.params.id, userId: req.auth.userId})
          .then((thing) => {
              Thing.updateOne({ _id: req.params.id}, { ...thingObject, _id: req.params.id})
              .then(() => res.status(200).json({message : 'Objet modifié!'}))
              .catch(error => res.status(401).json({ error }));
          })
          .catch((error) => {
              res.status(400).json({ error });
          });
     };
      
    const deleteThing = (id, userId) => {
      const result = { data: null, error: null };
      return Thing.findOne({ _id: id, userId:userId}).then((thing) => {
              const filename = thing.imageUrl.split('/images/')[1];
              fs.unlink(`images/${filename}`, () => {
                  return Thing.deleteOne({_id: id})
                      .then(() => {  return {...result, data:'Error delete'}})
                      .catch((error) => ({...result, error}));
              });
              
          })
          .catch((error) => ({...result, error}));
   };
      
   const getAllStuff = () => {
      const result = { data: null, error: null };
      return Thing.find().then(
          (data) => {
            return {...result, data}
          }
        ).catch(
          (error) => {
            return {...result, error}
          }
        );
      };
  
export {createThing, getOneThing, modifyThing, deleteThing, getAllStuff};
