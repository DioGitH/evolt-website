<?php

require 'vendor/autoload.php'; // Load Composer's autoloader

use Google\Cloud\BigQuery\BigQueryClient;

$user = "root";
$password = "404_SOLID";
$database = "smart-door-lock";
$table = "logs";

try {
    $db = new PDO("mysql:host=localhost;dbname=$database", $user, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Query to get all data from MySQL table
    $stmt = $db->query("SELECT * FROM $table");
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($data) {
        echo "Data berhasil diambil dari MySQL!<br>";

        // Set BigQuery parameters
        $projectId = 'project-kelompok-404';
        $datasetId = 'project-kelompok-404.smart_door_lock';
        $bigQueryTable = 'project-kelompok-404.smart_door_lock.logs'; // Pastikan tabel ini bukan tabel eksternal

        putenv('GOOGLE_APPLICATION_CREDENTIALS=/var/www/html/evolt/src/evolt-cloud/project-kelompok-404-1c8b616e9203.json');

        $bigQuery = new BigQueryClient([
            'projectId' => $projectId,
        ]);

        $dataset = $bigQuery->dataset($datasetId);
        $table = $dataset->table($bigQueryTable);

        // Prepare data for insertion to BigQuery
        $rows = [];
        foreach ($data as $row) {
            $rows[] = ['data' => [
                'Id_log' => $row['id_log'],
                'Log_status' => $row['log_status'],
                'Door_name' => $row['door_name'],
                'Username' => $row['username'],
                'Image_name' => $row['image_name'],
                'Created_at' => $row['created_at'],
                'Updated_at' => $row['updated_at'],
            ]];
        }

        echo "Preparing to insert into BigQuery: " . json_encode($rows) . "<br>";

        $insertResponse = $table->insertRows($rows);

        if ($insertResponse->isSuccessful()) {
            echo "Data berhasil disisipkan ke BigQuery!<br>";
        } else {
            echo "Gagal menyisipkan data ke BigQuery.<br>";
            foreach ($insertResponse->failedRows() as $row) {
                printf('Error inserting row: %s' . PHP_EOL, json_encode($row['row']));
                foreach ($row['errors'] as $error) {
                    printf('Error reason: %s' . PHP_EOL, $error['reason']);
                    printf('Error message: %s' . PHP_EOL, $error['message']);
                }
            }
        }
    } else {
        echo "Tidak ada data yang ditemukan di MySQL.<br>";
    }
} catch (PDOException $e) {
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
} catch (Exception $e) {
    print "General Error!: " . $e->getMessage() . "<br/>";
    die();
}
