/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.createTable('songs', {
    id: {
      type: 'varchar(50)',
      primaryKey: true,
    },
    title: {
      type: 'TEXT',
      notNull: true,
    },
    year: {
      type: 'integer',
      notNull: true,
    },
    genre: {
      type: 'TEXT',
      notNull: true,
    },
    performer: {
      type: 'TEXT',
      notNull: true,
    },
    duration: {
      type: 'integer',
    },
    album_id: {
      type: 'varchar(50)',
      references: '"albums"',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('songs');
};
