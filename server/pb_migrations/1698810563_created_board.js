/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "s9xtprxs4yrlwlm",
    "created": "2023-11-01 03:49:23.558Z",
    "updated": "2023-11-01 03:49:23.558Z",
    "name": "board",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "xcep8pv7",
        "name": "title",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "uxazbfbu",
        "name": "cards",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "qaymw0cv574fbjy",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
          "displayFields": null
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("s9xtprxs4yrlwlm");

  return dao.deleteCollection(collection);
})
