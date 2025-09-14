exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('notes', {
    id: 'id',
    title: { type: 'text', notNull: true },
    content: { type: 'text' },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
    updated_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
    is_pin: { type: 'boolean', notNull: true, default: false },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('notes');
};