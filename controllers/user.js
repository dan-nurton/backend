import User from '../models/User.js';
import bcrypt from 'bcrypt';

class ControllerUser {
    
    signup = (req, res, next) => {
        bcrypt.hash(req.body.password, 10)
          .then(hash => {
            const user = new User({
              email: req.body.email,
              password: hash
            });
            user.save()
              .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
              .catch(error => res.status(400).json({ error }));
          })
          .catch(error => res.status(500).json({ error }));
      };
      
      login = (req, res, next) => {
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
  }
const userCtrl = new ControllerUser();
export default userCtrl;