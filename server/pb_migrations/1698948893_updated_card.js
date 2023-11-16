/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qaymw0cv574fbjy")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "s9idjrev",
    "name": "order",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qaymw0cv574fbjy")

  // remove
  collection.schema.removeField("s9idjrev")

  return dao.saveCollection(collection)
})
