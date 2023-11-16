/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("s9xtprxs4yrlwlm")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8sbnawup",
    "name": "owner",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("s9xtprxs4yrlwlm")

  // remove
  collection.schema.removeField("8sbnawup")

  return dao.saveCollection(collection)
})
