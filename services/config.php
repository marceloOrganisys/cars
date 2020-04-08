<?php

	header("Access-Control-Allow-Origin: *");

	if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
		header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
		header("Access-Control-Max-Age: 604800");
		header("Access-Control-Allow-Headers: x-requested-with");
		exit(0);
	}