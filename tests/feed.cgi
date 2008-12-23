#!/usr/bin/perl
#!perl
##
## OpenSocial jQuery
##
## Copyright(C) 2008 LEARNING RESOURCE LAB
## http://friendfeed.com/nakajiman
## http://hp.submit.ne.jp/d/16750/
##
## Dual licensed under the MIT and GPL licenses:
## http://www.opensource.org/licenses/mit-license.php
## http://www.gnu.org/licenses/gpl.html
##
use strict;
use CGI;
$CGI::DISABLE_UPLOADS = 1;
$CGI::POST_MAX=1024*1024*1; #1MB

my $cgi = CGI->new();

print $cgi->header(
  -type => 'text/xml',
  -charset => 'utf-8'
);

print <<EOB;
<?xml version="1.0" encoding="UTF-8"?>
<feed
  xmlns="http://www.w3.org/2005/Atom"
  xml:lang="ja"
>
<link href="http://example.com" />
<title>title</title>
<entry>
<link href="http://example.com/1" />
<title>title/1</title>
</entry>
</feed>
EOB

1;
