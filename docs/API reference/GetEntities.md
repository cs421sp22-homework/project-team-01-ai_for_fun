# GetEntities

Return all entities group by model and topic

**URL** : `/getentities`

**Method** : `GET`

**Auth required** : No

## Success Response

**Code** : `200 OK`

**Content example**

```json
[
    {
        "_id": {
            "mode": "styleflow",
            "topic": "Star"
        },
        "entities": [
            {
                "_id": "62316297289623b80e1fa66a",
                "imagename": "04",
                "imgUrl": "./img/04.png",
                "mode": "styleflow",
                "topic": "Star",
                "vedioUrl": "....",
                "videoname": "04"
            }
        ]
    },
    {
        "_id": {
            "mode": "styleflow",
            "topic": "house"
        },
        "entities": [
            {
                "_id": "62316268289623b80e1fa669",
                "imagename": "03",
                "imgUrl": "./img/03.png",
                "mode": "styleflow",
                "topic": "house",
                "vedioUrl": "....",
                "videoname": "03"
            }
        ]
    },
    {
        "_id": {
            "mode": "swapface",
            "topic": "Star"
        },
        "entities": [
            {
                "_id": "623161a5289623b80e1fa667",
                "imagename": "01",
                "imgUrl": "./img/01.png",
                "mode": "swapface",
                "topic": "Star",
                "vedioUrl": "....",
                "videoname": "01"
            }
        ]
    },
    {
        "_id": {
            "mode": "swapface",
            "topic": "house"
        },
        "entities": [
            {
                "_id": "623161f1289623b80e1fa668",
                "imagename": "02",
                "imgUrl": "./img/02.png",
                "mode": "swapface",
                "topic": "house",
                "vedioUrl": "....",
                "videoname": "02"
            }
        ]
    }
]
```

