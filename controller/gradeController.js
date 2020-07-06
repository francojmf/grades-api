import { db } from '../models/index.js';

const Grade = db.grade;

const create = async (req, res) => {
  const grade = new Grade({
    name: req.body.name,
    subject: req.body.subject,
    type: req.body.type,
    value: req.body.value,
    lastModified: req.body.lastModified,
  });
  try {
    const data = grade.save(grade);
    res.send(data);
  } catch (error) {
    res.status(500).send('Erro ao inserir objeto: ' + error);
  }
};

const findAll = async (req, res) => {
  try {
    const data = await Grade.find();

    res.send(data);
  } catch (error) {
    res.status(500).send('Erro ao buscar todos as grades' + error);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Grade.findById({ _id: id });

    res.send(data);
  } catch (error) {
    res.status(500).send(`Erro ao buscar a grade id ${id} ${error}`);
  }
};

const update = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Grade.findByIdAndUpdate({ _id: id }, req.body);

    if (!data) {
      res.send(`Grade id ${id} nao encontrado`);
    } else {
      res.send('Grade atualizada com sucesso');
    }
  } catch (error) {
    res.status(500).send(`Erro ao atualizar a grade id ${id} ${error}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Grade.findByIdAndRemove({ _id: id });

    if (!data) {
      res.send(`Grade id ${id} não encontrada`);
    } else {
      res.send('Grade excluida com sucesso');
    }
  } catch (error) {
    res.status(500).send(`Erro ao excluir a grade id ${id} ${error}`);
  }
};

export default { create, findAll, findOne, update, remove };
