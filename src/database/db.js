import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import { countPreguntas, countUser, createPreguntaTable, createUserTable, drop, drop1, getPreguntaQuery, getUserQuery, insertPreguntas, insertUser, updateNameUserQuery, updateRandomUserQuery, updateStatsUserQuery } from "./queries";
import { Asset } from 'expo-asset';

function openDatabase() {

    const DB_NAME = 'aaa.db'

    const db = SQLite.openDatabase(DB_NAME);
    return db;
}
  
const db = openDatabase();
  

// export async function openLocalDatabase(pathToDatabaseFile) {
//     if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
//       await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
//     }
//     await FileSystem.downloadAsync(
//       pathToDatabaseFile,
//       FileSystem.documentDirectory + 'SQLite/oposiciones.db'
//     );
//     return SQLite.openDatabase('oposiciones.db');
//   }


  const dropTables = async() => {
    db.transaction(tx => {
        tx.executeSql(drop);
        tx.executeSql(drop1);
    } )
}

const createTables = async () => {
    db.transaction(tx => {
        tx.executeSql(createPreguntaTable, null, (txObj, result) => console.log(result), (txObj, error) => console.log(error));
        tx.executeSql(createUserTable);
    } )
}

const inserData = async () => {
    db.transaction(tx => {
        tx.executeSql(countPreguntas, null,
            (txObj, result) => {
                // console.log(result.rows._array[0].count);
                if (result.rows._array[0].count == 0) {
                    insertPreguntas.map((value) => {
                        tx.executeSql(value, null, (txObj, result) => {}, (txObj, error) => console.log(error))      
                    })  
                }
            }, (txObj, error) => console.log(error))
    })
    db.transaction(tx => {
        tx.executeSql(countUser, null,
            (txObj, result) => {
                // console.log(result.rows._array[0].count);
                if (result.rows._array[0].count == 0) {
                    tx.executeSql(insertUser, null, (txObj, result) => {}, (txObj, error) => console.log(error))      
                }
            }, (txObj, error) => console.log(error))
    })
}


export const createDatabase = async () => {
    // await dropTables();
    await createTables();
    await inserData();  
}

export const getPregunta = async (id) => {
 return new Promise((resolve, reject) => {
    db.transaction( tx => {
        tx.executeSql(getPreguntaQuery, [id],
        (txObj, results) => resolve(results.rows._array[0]) , 
        // (txObj, results) => console.log(results.rows._array[0]) , 
        (txObj, error) => reject(error.message))
      });
}); 
}

export const getUser = async (id) => {
    return new Promise((resolve, reject) => {
       db.transaction( tx => {
           tx.executeSql(getUserQuery, [id],
           (txObj, results) => resolve(results.rows._array[0]) , 
           (txObj, error) => reject(error.message))
         });
   }); 
}

export const updateNameUser = (name) => {
    db.transaction( tx => {
        tx.executeSql(updateNameUserQuery, [name],
        (txObj, results) => console.log(results) , 
        (txObj, error) => console.log(error.message))
      });
}


export const updateRandomUser = (random) => {
    db.transaction( tx => {
        tx.executeSql(updateRandomUserQuery, [random],
        (txObj, results) => console.log(results) , 
        (txObj, error) => console.log(error.message))
      });
}

export const updateStatsUser = (correctas,fallidas,porciento) => {
    db.transaction( tx => {
        tx.executeSql(updateStatsUserQuery, [correctas,fallidas,porciento],
        (txObj, results) => console.log(results) , 
        (txObj, error) => console.log(error.message))
      });
}
