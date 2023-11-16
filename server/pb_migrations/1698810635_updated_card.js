/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qaymw0cv574fbjy")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hp4hijre",
    "name": "status",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "TO_DO",
        "IN_PROGRESS",
        "REVIEW",
        "DONE"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qaymw0cv574fbjy")

  // remove
  collection.schema.removeField("hp4hijre")

  return dao.saveCollection(collection)
})
