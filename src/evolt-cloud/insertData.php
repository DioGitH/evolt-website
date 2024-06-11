<?php

require 'vendor/autoload.php'; // Load Composer's autoloader

use Google\Cloud\BigQuery\BigQueryClient;

$user = "xxx";
$password = "xxx";
$database = "xxx";
$table = "xxx";

try {
    $db = new PDO("mysql:host=localhost;dbname=$database", $user, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Query to get all data from MySQL table
    $stmt = $db->query("SELECT * FROM $table");
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($data) {
        echo "Data berhasil diambil dari MySQL!<br>";

        // Set BigQuery parameters
        $projectId = 'xxx';
        $datasetId = 'xxx';
        $bigQueryTable = 'xxx'; // Pastikan tabel ini bukan tabel eksternal

        putenv('GOOGLE_APPLICATION_CREDENTIALS=/var/www/html/file_dari_service_account.json');

        $bigQuery = new BigQueryClient([
            'projectId' => $projectId,
        ]);

        $dataset = $bigQuery->dataset($datasetId);
        $table = $dataset->table($bigQueryTable);

        // Prepare data for insertion to BigQuery
        $rows = [];
        foreach ($data as $row) {
            $rows[] = ['data' => [
                'Temperature' => $row['temperature'],
                'Humidity' => $row['humidity'],
                'Kelembapan' => $row['lembab'],
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
